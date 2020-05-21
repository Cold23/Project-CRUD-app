const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// create connection to mysql
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3306',
	password: '',
	database: 'project'
});

//Connect
db.connect((err) => {
	if (err) {
		throw err;
	}
});

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/home?', (req, res) => {
	res.send("home get");
	console.log("test");
});

router.get('/supermarkets', (req, res) => {
	res.sendFile(__dirname + '/client/home.html', {}, function (err) {
		if (err) {
			console.log(err);
		} else {

		}
	});
});

router.get('/items', function (req, res) {
	res.sendFile(__dirname + '/client/itemspage.html');
})

router.get('/transcaction', function (req, res) {
	res.sendFile(__dirname + '/client/viewtranscaction.html');
})

router.post('/gettranscaction1', function (req, res) {
	let id = req.query.id;
	let sqlquery = "SELECT * FROM transcaction WHERE id=" + id + " LIMIT 1";
	db.query(sqlquery, function (err, result) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false });
		} else {
			res.send({ dat: result, success: true });
		}
	})
})

router.post('/gettranscactionitems', function (req, res) {
	let id = req.query.id;
	let sqlquery = "SELECT i.Barcode,c.name,i.signature_item,i.current_price,co.amount\
	FROM item as i, category as c, contains as co \
	WHERE co.transcaction_id="+ id + " && i.Barcode = co.barcode && i.category_id = c.category_id";
	db.query(sqlquery, function (err, result) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false });
		} else {
			res.send({ dat: result, success: true });
		}
	})
})

router.post('/getalltranscactions', function (req, res) {
	db.query('SELECT * FROM transcaction ORDER BY date DESC', function (err, result) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false });
		} else {
			res.send({ dat: result, success: true });
		}
	})
})

router.post('/getallcustomers', function (req, res) {
	let post = "SELECT card_id ,\
	points,\
	CONCAT(first_name,' ', last_name) AS name,\
	CONCAT(street_name ,' ', street_number ,' ', city ,' ', state ,' ', zipcode) AS adrress,\
	birth_date,\
	married,\
	children,\
	pets FROM customer";
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})

router.post('/customersupermarkets', function (req, res) {
	let id = req.query.id;
	let post = 'SELECT s.id,s.square_meters,s.days_open,s.times,CONCAT(s.street_name," ",s.street_number," ",s.city," ",s.state," ",s.zipcode) AS adrress, s.phone_number FROM supermarkets AS s, transcaction AS t, customer AS c \
	WHERE t.store_id = s.id && t.card_id = c.card_id && c.card_id ='+ id
	db.query(post, function (err, result) {
		if (err) {
			console.log(err)
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, data: result })
		}
	})
})

router.post('/getcustomervisittimes', function (req, res) {
	let id = req.query.id;
	let post = "SELECT DATE_FORMAT(date,'%H:00') AS time,\
	COUNT(*) AS value  FROM transcaction WHERE card_id =" + id + " GROUP BY time ORDER by time ASC";
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			throw err;
		} else {
			res.send(result);
		}
	})
})

router.post('/customermeanweek', function (req, res) {
	let id = req.query.id;
	let post = 'SELECT WEEK(date) AS week, COUNT(card_id)/7 AS average FROM transcaction  WHERE card_id =' + id + ' GROUP by week ORDER BY week ASC'
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})

router.post('/customermeanmonth', function (req, res) {
	let id = req.query.id;
	let post = 'SELECT MONTH(date) AS month, COUNT(card_id)/30 AS average FROM transcaction  WHERE card_id =' + id + ' GROUP by month ORDER BY month ASC'
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})

router.post('/addcustomer', function (req, res) {
	let post = "SELECT card_id ,\
	points,\
	CONCAT(first_name,' ', last_name) AS name,\
	CONCAT(street_name ,' ', street_number ,' ', city ,' ', state ,' ', zipcode) AS adrress,\
	birth_date,\
	married,\
	children,\
	pets FROM customer WHERE card_id="+ req.body.card_id;
	db.query('INSERT INTO customer SET?', req.body, function (err) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false })
		} else {
			res.send({ success: true })
		}
	})
})

router.post('/deletecustomer', function (req, res) {
	let id = req.query.id;
	db.query('DELETE FROM customer WHERE card_id=' + id, function (err) {
		if (err) {
			res.send({ success: false });
		} else {
			res.send({ success: true });
		}
	})
})

router.get('/transcactions', function (req, res) {
	res.sendFile(__dirname + '/client/transcactionpage.html');
})

router.get('/customers', function (req, res) {
	res.sendFile(__dirname + '/client/customerpage.html');
})

router.post('/insert', (req, res) => {
	let sql = 'INSERT INTO supermarkets SET ?';
	let post = {
		id: req.body.id,
		square_meters: req.body.square_meters,
		days_open: req.body.open,
		times: req.body.opentime + '-' + req.body.closetime,
		street_name: req.body.streetname,
		street_number: req.body.streetno,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zip,
		phone_number: req.body.phone
	};
	let query = db.query(sql, post, (err, result) => {
		if (err) {
			res.send(false);
		} else {
			res.send(result);
		}
	});
});

router.get('/getsuper', (req, res) => {
	let sql = 'SELECT * FROM supermarkets';
	let query = db.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
}); //get data

router.post('/getitemhistory', function (req, res) {
	let barcode = req.query.barcode;
	let post = 'SELECT a.date,a.old_price,a.new_price FROM price_change AS a WHERE a.barcode =' + barcode;
	db.query(post, function (err, result) {
		if (err) {
			res.send(false);
		} else {
			res.send(result);
		}
	})
})

router.post('/getitemsall', function (req, res) {
	let sqlquery = "SELECT i.Barcode, c.name,i.signature_item,i.current_price \
	FROM item as i, category AS c \
	WHERE c.category_id = i.category_id";
	db.query(sqlquery, function (err, result) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false });
		} else {
			res.send({ dat: result, success: true });
		}
	})

});

router.get('/getitem1', function (req, res) {
	var barcode = req.query.barcode;
	var id = req.query.id;
	let sql = 'SELECT  i.Barcode,d.name,i.signature_item,i.current_price,c.self,c.aisle \
	FROM item AS i , carries AS c, category AS d\
	WHERE c.barcode = i.Barcode && d.category_id = i.category_id && i.Barcode=' + barcode + '&& c.store_id =' + id;
	db.query(sql, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.get('/getitem2', function (req, res) {
	var barcode = req.query.barcode;
	let sql = 'SELECT i.Barcode,d.name,i.signature_item,i.current_price \
	FROM item AS i ,  category AS d\
	WHERE d.category_id = i.category_id && i.Barcode=' + barcode;
	db.query(sql, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

router.get('/getcategories', function (req, res) {
	db.query('SELECT * FROM category', function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	})
});


router.post('/getcustomertranscactions', function (req, res) {
	let id = req.query.id;
	db.query('SELECT * FROM transcaction WHERE card_id =' + id, function (err, data) {
		if (err) {
			console.log(err);
			res.send({ msg: err.sqlMessage, success: false })
		} else {
			res.send({ dat: data, success: true })
		}
	})
})

router.post('/customerfavourite', function (req, res) {
	let id = req.query.id;
	let post = "SELECT i.Barcode,cat.name,i.signature_item,i.current_price , SUM(tc.amount) as occurences\
	FROM item as i, transcaction as t, customer as c, contains as tc, category as cat\
	WHERE c.card_id ="+ id + " && t.card_id=c.card_id && tc.transcaction_id = t.id && tc.barcode = i.Barcode && i.category_id = cat.category_id\
	GROUP BY i.Barcode ORDER BY SUM(tc.amount) desc LIMIT 10 ";
	db.query(post, function (err, data) {
		if (err) {
			console.log(err)
			res.send({ success: false, msg: err.sqlMessage });
		} else {
			res.send({ success: true, dat: data });
		}
	})
})

router.post('/getsuperitems', function (req, res) {
	let id = req.query.id;
	let sql =
		'SELECT i.Barcode,d.name,i.signature_item,i.current_price,c.self,c.aisle FROM item as i, carries as c, category as d  WHERE c.store_id= ' +
		id +
		' && c.barcode = i.Barcode && d.category_id = i.category_id';

	db.query(sql, function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/getsuperitemsall', function (req, res) {
	db.query('SELECT Barcode FROM item', function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/deletesuperitem', function (req, res) {
	let id = req.query.id;
	let barcode = req.query.barcode;
	let q = 'DELETE FROM carries WHERE store_id=' + id + '&& barcode=' + barcode;
	db.query(q, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(true);
		}

	});
});

router.get('/editsuper', function (req, res) {
	res.sendFile(__dirname + '/client/editsuper.html', function (err, result) {
		if (err) console.log(err);
	});
});


// router.post('/updateprovides', function (req, res) {
// 	let sql = 'DELETE FROM provides WHERE\
// 			(SELECT COUNT(i.category_id)\
// 			FROM item as i, carries as c\
// 			WHERE provides.category_id = i.category_id && c.barcode = i.Barcode && provides.store_id = c.store_id) = 0';
// 	db.query(sql, function (err, result) {
// 		if (err) {
// 			res.send(err);
// 		} else {
// 			res.sendStatus(200);
// 		}
// 	})
// })

// router.post('/syncprovides', function (req, res) {// DISTINCT FOR DOUBLE OCCURENCES
// 	let post = 'INSERT INTO provides(store_id,category_id) \
// 			 SELECT DISTINCT s.id,i.category_id  \
// 			 FROM supermarkets AS s,item AS i, carries AS c \
// 			 WHERE c.barcode = i.Barcode && c.store_id = s.id &&\
// 			 NOT EXISTS(SELECT * FROM provides AS a WHERE a.store_id = s.id && a.category_id = i.category_id)';
// 	db.query(post, function (err, result) {
// 		if (err) {
// 			res.sendStatus(500);
// 		} else {
// 			res.sendStatus(200);
// 		}
// 	})
// })

router.post('/updateshop', function (req, res) {
	let id = req.query.id;
	let sql = 'UPDATE supermarkets SET ? WHERE id=' + id;
	db.query(sql, req.body, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ msg: err.sqlMessage, success: false });
		} else {
			res.send({ success: true });
		}

	});
});

router.post('/updateshopitem', function (req, res) {
	let id = req.query.id;
	let barcode = req.query.barcode;
	let post = 'UPDATE carries SET ? WHERE store_id=' + id + ' && barcode=' + barcode;
	db.query(post, req.body, function (err, result) {
		if (err) {
			throw err;
		} else {
			res.sendStatus(200);
		}
	})
})

router.post('/updateitem', function (req, res) {
	let barcode = req.query.barcode;
	let post = 'UPDATE item SET ? WHERE BARCODE=' + barcode;
	db.query(post, req.body, function (err, result) {
		if (err) {
			res.send(false);
		} else {
			res.send(true);
		}
	})
})

router.post('/deleteitem', function (req, res) {
	let barcode = req.query.barcode;
	db.query("DELETE FROM item WHERE item.Barcode =" + barcode, function (err, result) {
		if (err) {
			res.send(false);
		} else {
			res.send(true);
		}
	})
})

router.get('/edititem2', function (req, res) {
	res.sendFile(__dirname + '/client/edititem2.html');
})

router.get('/edititem', function (req, res) {
	res.sendFile(__dirname + '/client/edititem.html');
})
//#region random data generation 

router.get('/additemrandom', function (req, res) {
	var y = Math.random();
	if (y < 0.7) {
		y = Math.floor(y)
	}
	else {
		y = Math.ceil(y)
	}
	let obj = {
		barcode: Math.random().toString().slice(2, 11),
		category_id: Math.floor(Math.random() * 6),
		signature_item: y,
		current_price: (Math.random() * 100).toFixed(2)
	};
	db.query("INSERT IGNORE INTO item SET ?", obj, function (err, result) {
		if (err) {
			res.send(err);
		}
		res.send(result);
	})
})

router.get('/randompricehistory', function (req, res) {
	var barcodes = [];
	db.query("SELECT Barcode, current_price FROM item", function (a, b) {
		if (a) {
			res.send(a);
		}
		barcodes = Object.values(b);
		var last_price = 0;
		for (let index = 0; index < barcodes.length; index++) {
			last_price = 0;
			for (let i = 0; i < Math.floor(Math.random() + 1); i++) {
				var obj = {
					date: randomDate(new Date(1990, 0, 1), new Date(2019, 11, 30)) + " " + randomTime(),
					barcode: barcodes[index]["Barcode"],
					old_price: last_price,
					new_price: (Math.random() * 100).toFixed(2)
				}
				last_price = obj["new_price"];
				db.query("INSERT IGNORE INTO price_change SET ?", obj, function (e, r) {
					if (e) {
						res.send(e);
					}
				})
			}
			var obj2 = {
				date: randomDate(new Date(2020, 0, 1), new Date(2020, 3, 30)) + " " + randomTime(),
				barcode: barcodes[index]["Barcode"],
				old_price: last_price,
				new_price: barcodes[index]["current_price"]
			}
			db.query("INSERT IGNORE INTO price_change SET ?", obj2, function (e, r) {
				if (e) {
					res.send(e);
				}
			})

		}
	})
	res.send("DONE")
})

let id = 200;

router.get('/addtranscactionrandom', function (req, res) {
	var payment_types = [
		'cash',
		'credit',
		'debit'
	]
	var barcodes;
	var obj = {
		payment_method: payment_types[Math.floor(Math.random() * 3)],
		card_id: "",
		date: randomDate(new Date(1990, 0, 1), new Date()) + " " + randomTime(),
		store_id: "",
		total_price: 0
	}
	db.query('SELECT id FROM supermarkets', function (err1, results) {
		if (err1) {
			res.send(err1);
		}
		let stores = Object.values(results);
		obj.store_id = stores[Math.floor(Math.random() * (stores.length - 1))]["id"];
		db.query("SELECT card_id FROM customer", function (err2, result) {
			if (err2) {
				res.send(err2)
			}
			let cards = Object.values(result);
			obj.card_id = cards[Math.floor(Math.random() * cards.length)]["card_id"];
			db.query("INSERT IGNORE INTO transcaction SET ?", obj, function (err3) {
				if (err3) {
					res.send(err3)
				}
				id++;
				db.query("SELECT Barcode FROM item", function (errr, data) {
					if (errr) {
						res.send(errr);
					}
					barcodes = Object.values(data);
					for (let index = 0; index < Math.floor(Math.random() * 10 + 1); index++) {
						let barcodet = barcodes[Math.floor(Math.random() * barcodes.length)]["Barcode"];
						let amountt = Math.floor(Math.random() * 10 + 1);
						var obj2 = {
							transcaction_id: id,
							barcode: barcodet,
							amount: amountt
						}
						db.query("INSERT IGNORE INTO contains SET ?", obj2, function (er, ress) {
							var post = {
								store_id: obj["store_id"],
								barcode: barcodet,
								self: Math.floor(Math.random() * 50),
								aisle: Math.floor(Math.random() * 50)
							}
							db.query('INSERT IGNORE INTO carries set ?', post, function (k) {

							})
						})

					}
				})

			})
		})
	})
	res.end();
})

function randomTime() {
	var h = Math.floor(Math.random() * (21 - 8) + 8)
	var m = Math.floor(Math.random() * 59);
	var s = Math.floor(Math.random() * 59);
	if (h.length == 1) {
		h = 0 + '' + h
	}
	if (m.length == 1) {
		m = 0 + '' + h
	}
	if (s.length == 1) {
		s = 0 + '' + h
	}
	return (h + ":" + m + ":" + s)
}

function randomDate(start, end) {
	var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
//#endregion

router.post('/addsuperitem', function (req, res) {
	let id = req.query.id;
	let barcode = req.body.barcode;
	let post = {
		store_id: id,
		barcode: barcode,
		self: req.body.self,
		aisle: req.body.aisle
	};
	let sql2 =
		'SELECT i.Barcode,d.name,i.signature_item,i.current_price,c.self,c.aisle \
                FROM item as i, carries as c, category as d  \
                WHERE c.store_id= ' +
		id +
		' &&\
                i.Barcode =' +
		barcode +
		' && \
                i.Barcode = c.barcode &&\
                d.category_id = i.category_id';
	db.query('INSERT INTO carries SET ?', post, function (err) {
		if (err) {
			console.log(err);
			res.send({ code: err.code, success: false });
		} else {
			db.query(sql2, function (e, r) {
				if (e) {
					res.send({ success: false });
				} else {
					res.send({ values: r, success: true });
				}
			});
		}
	});
});

router.post('/getcategory', function (req, res) {
	let id = req.query.id;
	let sql =
		'SELECT c.category_id , c.name FROM category as c, provides as p  WHERE p.store_id= ' +
		id +
		' && p.category_id = c.category_id';

	db.query(sql, function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/gettranscaction', function (req, res) {
	let id = req.query.id;
	let sql =
		'SELECT * \
    	FROM transcaction AS t\
    	WHERE t.store_id= ' + id;

	db.query(sql, function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/removetranscaction', function (req, res) {
	let id = req.query.id;
	db.query('DELETE FROM transcaction WHERE id=' + id, function (err, result) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

router.post('/viewsuper', function (req, res) {
	res.status(200);
	res.end();
});

router.get('/viewitem', function (req, res) {
	res.sendFile(__dirname + '/client/itemview.html');
})

router.get('/viewsuper2', function (req, res) {
	res.status(200);
	res.sendFile(__dirname + '/client/view.html', {}, function (err) {
		if (err) {
			console.log(err);
		} else {

		}
	});
});

router.get('/viewcustomer', function (req, res) {
	res.sendFile(__dirname + '/client/customerview.html');
})

router.post('/deletesuper', (req, res) => {
	let sql = 'DELETE FROM supermarkets WHERE id = ?';
	let query = db.query(sql, req.body.id, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	});
});

router.post('/getsupersingle', (req, res) => {
	let id = req.query.id;
	let sql = 'SELECT * FROM supermarkets WHERE id =' + id;
	let query = db.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(result);
	});
});

router.post('/getcustomersingle', function (req, res) {
	let id = req.query.id;
	let post = "SELECT card_id ,\
	points,\
	CONCAT(first_name,' ', last_name) AS name,\
	CONCAT(street_name ,' ', street_number ,' ', city ,' ', state ,' ', zipcode) AS adrress,\
	birth_date,\
	married,\
	children,\
	pets FROM customer WHERE card_id ="+ id;
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.send(result);
		}
	})
})

app.use(express.static(__dirname + '/client', { index: false }));

app.use('/', router);

app.listen('3000', () => {
	console.log('server start');
});
