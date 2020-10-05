const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const request = require('request');
const btoa = require('btoa');
var atob = require('atob');
var urlExpander=require('expand-url');
const { json } = require('express');
var Bypasser = require('node-bypasser');

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(express.static(__dirname+"/website"))
app.use(express.static(__dirname+"/client_bypass"))

function testregex(string, regex) {
  var reg = new RegExp(regex);
  return(reg.test(string))
}

function change(url) {
  var urlobj = new URL(url);
  var path = urlobj.pathname
  var done1 = path.substring(9,path.length - 33);
  var done2 = "https://link-to.net"+done1
  return done2;
  }

app.get('/api', (req, res) => {
    var url11 = decodeURI(req.url.substring(9));

    var output = {
      success: undefined,
      errormsg: undefined,
      bypassedlink: undefined,
      inputlink: url11,
      type: undefined
    };

    if(url11.slice(-1) == "/") {
      url11 = url11.substring(0, url11.length - 1)
    }
    if(url11 == "") {
      output.success = false;
      output.errormsg = "No URL Given Lol"
      res.end(JSON.stringify(output))
    }
    try {
      new URL(url11)
    } catch {
      output.success = false;
      output.errormsg = "Invalid URL"
      res.end(JSON.stringify(output))
    }



      output.type = "Adf.ly(beta)"
      request(url11, function (error, response, body) {
   if(!error) {
       
        var data = body.substring(body.indexOf('ysmm = \''), body.length)
 try {
     eval(data.substring(0,data.indexOf(";")))
     failed = false;
 } catch {
 //invalid
 failed = true;
 output.success = false;
 output.errormsg = "Invalid Adfly URL"
 res.end(JSON.stringify(output))
 }
 if(!failed) {
        r=ysmm
 
        let a,m,I="",X=""
        for(m=0;m<r.length;m++)
        {
            if(m%2==0)
            {
                I+=r.charAt(m)
            }
            else
            {
                X=r.charAt(m)+X
            }
        }
        r=I+X
        a=r.split("")
        for(m=0;m<a.length;m++)
        {
            if(!isNaN(a[m]))
            {
                for(var R=m+1;R<a.length;R++)
                {
                    if(!isNaN(a[R]))
                    {
                        let S=a[m]^a[R]
                        if(S<10)
                        {
                            a[m]=S
                        }
                        m=R
                        R=a.length
                    }
                }
            }
        }
        r=a.join('')
        r=atob(r)
        r=r.substring(r.length-(r.length-16))
        r=r.substring(0,r.length-16)
    try {
 bypassed = decodeURIComponent(new URL(r).searchParams.get("dest"))
    } catch {
      failed = true;
      output.success = false
      output.errormsg =  "Unexpected Error"
      res.end(JSON.stringify(output))
    }
if(!failed) {
  if(!(bypassed === "null")) {
    console.log(bypassed)
    output.success = true
    output.bypassedlink =  bypassed
    res.end(JSON.stringify(output))
  } else {
    output.success = false
    output.errormsg =  "Couldnt retrieve bypassed URL"
    res.end(JSON.stringify(output))
  }
}
       
      } else {
        output.success = false;
        output.errormsg = "Could not fetch data"
        res.end(JSON.stringify(output))
      }
     }
       });
     
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
