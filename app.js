const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');

//mendeklarasikan PORT
const port = 8011;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//menggunakan semua file yang ada di js css asset
app.use(express.static(__dirname + '/public'));


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if ('OPTIONS' == req.method){
      res.sendStatus(200);
    }
    else{
        next();
    }
});

app.get('/about', (req, res) => {
    res.status(200);
    res.render('about');
});

app.get('/kontak', (req, res) => {
    res.status(200);
    res.render('kontak');
});

app.get('/login', (req, res) => {
    res.status(200).render('login');
});

app.get('/logout', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});
////--------------------------DATABASE------------------------------\\\\\

//membuat koneksi ke database
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'starbucks'
});

//Menghubungkan ke database
db.connect((err) => {
    if (err) throw err;
    console.log("Berhasil Terkoneksi Ke Database");
})

//form login ke menu admin
app.post('/auth', (request, response) => {
    var username_ = request.body.nama;
    var password_ = request.body.password;

    if (username_ && password_) {
        db.query('SELECT * FROM user WHERE nama = ? AND password = ?', [username_, password_], (error, results, fields) => {
            console.log("Username " + username_ + " telah berhasil login");
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.nama = username_;
                response.render('dashboard', {
									results : username_
								});
            } else {
                response.send('<h1>password dan username salah</h1>');
            }
            response.end();
        });
        } else {
        response.send('<h1>masukkan password dan username terlebih dahulu</h1>');
        response.end();
    }
});

//Menampilkan data ke halaman promo
app.get('/promo', (req, res) => {
	let query = "SELECT * FROM promo_harian";
	db.query(query, (err, result) => {
		res.render('promo', {
			rows : result
		})
	})
})

//Menampilkan data ke halaman tim
app.get('/tim', (req, res) => {
	let query = "SELECT * FROM team";
	db.query(query, (err, result) => {
		res.render('tim', {
			rows : result
		})
	})
})

//Menampilkan data kritik ke halaman feedback
app.get('/feedback', (req, res) => {
	let query = "SELECT * FROM kritik";
	db.query(query, (err, result) => {
		res.render('feedback', {
			rows : result
		})
	})
})

//Menampilkan data user ke halaman admin
app.get('/admin', (req, res) => {
	let query = "SELECT * FROM user";
	db.query(query, (err, result) => {
		res.render('admin', {
			rows : result
		})
	})
})

//Menampilkan data produk ke halaman services
app.get('/services', (req, res) => {
	let query = "SELECT * FROM produk";
	db.query(query, (err, result) => {
		res.render('services', {
			rows : result
		})
	})
})

//Menampilkan data produk ke halaman produk
app.get('/produk', (req, res) => {
	let query = "SELECT * FROM produk";
	db.query(query, (err, result) => {
		res.render('produk', {
			rows : result
		})
	})
})

//menambah data kritik ke halaman kontak
app.post('/submit', (req, res) => {
    var sql = "INSERT INTO kritik VALUES ('"+ req.body.nama+"', '"+ req.body.email+"','"+ req.body.jenis+"','"+ req.body.kritik+"')";
    db.query(sql, (err) => {
        if (err) throw err;
        res.redirect('kontak');
    });
});

//menambah data produk di halaman produk
app.post('/add', (req, res) => {
	let query = {id: req.body.id, nama: req.body.nama, jenis: req.body.jenis, harga: req.body.harga};
	db.query("INSERT INTO produk SET ?", query, (err) => {
		if (err) throw err;
		res.redirect('produk');
	})
})

//menambah data user di halaman admin
app.post('/save', (req, res) => {
	let data = {id: req.body.id, nama: req.body.nama, email: req.body.email, password: req.body.password,};
	db.query("INSERT INTO user SET ?", data, (err) => {
		if (err) throw err;
		res.redirect('admin');
	});
});

//Menghapus data user
app.post('/hapus', (req, res) => {
	let sql = "DELETE FROM user WHERE id='"+req.body.id+"'";
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect('admin');
	});
});

//Menampilkan data produk ke halaman produk
app.post('/hapus:id', (req, res) => {
	let query = "DELETE FROM produk WHERE id='"+req.body.id+"'";
	db.query(query, (err, result) => {
		if (err) throw err;
		res.redirect('produk');
	})
})

//Menghapus data dari kritik
app.post('/delete',(req, res) => {
    let query = "DELETE FROM kritik WHERE email='"+req.body.email+"'";
    db.query(query, (err, results) => {
      if(err) throw err;
        res.redirect('feedback');
    });
});

//Menampilkan data team ke halaman team
app.get('/team', (req, res) => {
		let query = "SELECT * FROM team"
		db.query(query, (err, result1) => {
					res.render('team', {
						rows : result1,
					});
		});
});

//update data user
app.post('/update/user', (req, res) => {
  let sql = "UPDATE user SET password ='"+req.body.password+"' WHERE nama="+req.body.nama;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('promo');
  });
});

//update data user
app.post('/update:pas', (req, res) => {
	let query = "UPDATE user SET nama='"+req.body.nama+"', email='"+req.body.email+"', password='"+req.body.password+"' WHERE id="+req.body.id;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.redirect('admin');
	});
});

//update data produk
app.post('/rubah:id?', (req, res) => {
	let query = "UPDATE produk SET nama='"+req.body.nama+"', jenis='"+req.body.jenis+"', harga='"+req.body.harga+"' WHERE id="+req.body.id;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.redirect('produk');
	});
});

//update data promo
app.post('/update',(req, res) => {
  let query = "UPDATE promo_harian SET promo ='"+req.body.promo+"' WHERE id="+req.body.id;
  db.query(query, (err, results) => {
    if(err) throw err;
    res.redirect('promo');
  });
});

//update data team
app.post('/update/team',(req, res) => {
  let query = "UPDATE team SET nama ='"+req.body.nama+"', tugas ='"+req.body.tugas+"' WHERE nim="+req.body.nim;
	db.query(query, (err, results) => {
    if(err) throw err;
    res.redirect('/tim');
  });
});

//Menampilkan data promo_harian ke halaman index
app.get('/', (req, res) => {
	let query = "SELECT * FROM promo_harian";
	db.query(query, (err, result) => {
		if(err) throw err;
		res.render('index',{
			rows1 : result
		});
	});
});

//membuat server port localhost:****
app.listen(port, (err) => {
    if (err){
        console.log(err);
    } else{
        console.log("Server Berjalan Di Port " + port);
    }
});
