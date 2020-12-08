const url = require('url');
const querystring = require('querystring');
const axios = require('axios');
const { response } = require('express');
const Invite = require('../models/invites')
require('dotenv').config();
const appUrl = process.env.APP_URL
axios.defaults.timeout = 2000;
module.exports = {
    index:(req,res,next)=>{
        res.render('pages/index')
    },
    create: async (req,res,next)=>{
        let rawUrl = (req.body.link);
        let parsedUrl = url.parse(rawUrl);
        let finalUrl = querystring.parse(parsedUrl.query);
          if(finalUrl['ip'] && finalUrl['httpPort'])
          {
            existing = await Invite.find({ip:finalUrl['ip'], port:finalUrl['httpPort']})

            if(Object.keys(existing).length == 0)
            {
                let invitelink = 'acmanager://race/online/join?query=race/online/join&ip='+finalUrl['ip']+'&'+'httpPort='+finalUrl['httpPort'];
                let urlslug = module.exports.slugGenerator();
                const newInvite = new Invite({
                    ip: finalUrl['ip'],
                    port: finalUrl['httpPort'],
                    slug: urlslug,
                    destination:invitelink
                })
                await newInvite.save();
                redirect = 'http://'+appUrl+'/join/'+newInvite.slug
                res.redirect(redirect)
            }
            else
            {
              redirect = 'http://'+appUrl+'/join/'+existing[0].slug
              res.redirect(redirect)
            }
            
          }
          else
          {
           console.log("Invalid URL")
          }
          
    },
    join:async (req,res,next)=>{
        const { slug } = req.params
        const result = await Invite.find().where('slug').equals(slug)
        let link = result[0].destination
        // console.log(result[0].ip)
        let url = "http://"+result[0].ip+':'+result[0].port+"/INFO"
        let meta = await module.exports.getServerDetails(url)
        if(meta == "Error")
        {
            res.render('pages/error') 
        }
        else{
        res.render('pages/join',{data:{meta,link}});
        }

    },
    getServerDetails: async (url)=>{
        try{
           let res = await axios.get(url)
           let data = res.data;
           return data; 
        }
        catch (err){
            return "Error";
        }
                 
    },
    slugGenerator:()=>{
        return Math.random().toString(36).substr(2, 9);
    }
    

}
