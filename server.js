var express = require('express');
var morgan = require('morgan');
var path = require('path');

var pool = require('pg').Pool;
var config = {
    user: 'milanchhatralia',
    database: 'milanchhatralia',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-milanchhatralia-34008'
};

var app = express();
app.use(morgan('combined'));

var article = {
    'article-one': {
    title: 'Article-one | Milan',
    heading: 'Article-one.',
    date: 'March 17, 2017',
    content: `<p>
                    Hello this is milan, building my first web-app. Hope you like.
                </p>
                <p>
                    Starting to build wasnt so tough but YES, it was with full of enthusiasum.
                </p>`
    },
    'article-two': {
            title: 'Article-two | Milan',
            heading: 'Article-Two.',
            date: 'March 18, 2017',
            content: `<p>
                            Hello this is milan, building my first web-app. Hope you like.
                        </p>
                        <p>
                            Starting to build wasn't so tough but yes, was with ful of enthusiasum.
                        </p>`
    },
    'article-three': {
    title: 'Article-three | Milan',
    heading: 'Article-three.',
    date: 'March 19, 2017',
    content: `<p>
                    Hello this is milan, building my first web-app. Hope you like.
                </p>
                <p>
                    Starting to build wasn't so tough but yes, was with ful of enthusiasum.
                </p>`
    }
};


function createTemplate(data){
    var title= data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var HTMLTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <br/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return HTMLTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new pool(config);
app.get('/test-db', function (req, res){
    //make a select request
    //listen to the responce
    pool.query('SELECT * FROM test',function (err, result){
        if(err){
            res.send(500).send(err.toString());
        } else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter',function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});


var names = [];
app.get('/submit-name',function(req, res){
    //Get the names from the request
   var name = req.query.name;
   
   names.push(name);
   //JSON javascript object notation
   res.send(JSON.stringify(names));
});

app.get('/article/:articleName',function(req, res){
    //articleName = article-one
    //articles[articleName] = content object for aticle one
    //var articleName = req.params.articleName;         over to server
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result){
        if(err){
            res.send(500).send(err.toString());
        } else{
            if (result.rows.length === 0){
                res.status(404).send('Article not found');
            }else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    //res.send(createTemplate(article[articleName]));       over to server
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
