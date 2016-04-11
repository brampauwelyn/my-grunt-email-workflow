module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

       pkg: grunt.file.readJSON('package.json'),


//encode special characters to HTML entity
'special-html': {
    compile: {
      files: {
        'email.html': '*.html',
      }
    }
  },




//upload local images to Rackspace CDN
cloudfiles: {
  prod: {
    'user': 'your username',
    'key': 'your API key',
    'region': 'IAD',
    'upload': [{
      'container': 'your container name',
      'src': 'images/*',
      'dest': 'images/',
    }]
  }
},

//change local path to new CDN path
cdnify: {
  someTarget: {
    options: {
      base: 'your CDN path'
    },
    files: [{
      expand: true,
      cwd: '',
      src: '*.html',
      dest: 'dist'
    }]
  }
},

//send a test mail via mailgun
    mailgun: {
  marketingTemplates: {
    options: {
      key: 'key-your mail gun API key',
      sender: 'sender email',
      recipient: 'recipients name',
      subject: 'This is a test email',
      preventThreading: true,
      hideRecipient: true

    },
    src: ['dist/email.html']
  }
},


//testing email with Litmus

    litmus: {
    test: {
      src: ['dist/email.html'],
      options: {
        username: 'your username',
        password: 'your password',
        url: 'your url',
        clients: ['gmailnew', 'ffgmailnew', 'chromegmailnew','android4','aolonline','ffaolonline','chromeaolonline','appmail7','appmail8','colorblind','messagelabs','ipadmini','ipad','barracuda','outlookfilter','spamassassin3','gmailnewspam','yahoospam','aolonlinespam','googleapps','chromegoogleapps','ffgoogleapps','iphone5s','iphone5sios8','iphone6','iphone6plus','iphone6s','iphone6splus','ol2000','ol2002','ol2003','ol2007','ol2010','ol2011','ol2013','ol2015','ol2016','outlookcom','ffoutlookcom','chromeoutlookcom','office365','chromeoffice365','thunderbirdlatest','yahoo','ffyahoo','chromeyahoo']
      }
    }
  }






  }  );

  // Load the Tasks
grunt.loadNpmTasks('grunt-special-html');
grunt.loadNpmTasks('grunt-cloudfiles');
grunt.loadNpmTasks('grunt-cdnify');
grunt.loadNpmTasks('grunt-mailgun');
grunt.loadNpmTasks('grunt-litmus');


  // Register the Tasks
grunt.registerTask('encode', ['special-html']);
grunt.registerTask('email',['special-html','cloudfiles','cdnify','mailgun']);
};
