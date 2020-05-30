const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// create connection to mysql
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3306',
	password: 'password',
	database: 'project'
});

//Connect
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("CONNECTED")
});

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

router.get('/customerdetailsview', function (req, res) {
	res.sendFile(__dirname + '/client/customerdetailsview.html')
})

router.get('/salesview', function (req, res) {
	res.sendFile(__dirname + '/client/salesview.html')
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
	let sqlquery = "SELECT i.name,i.Barcode,c.name as catname,i.signature_item,i.current_price,co.amount\
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

router.post('/getcustomersview', function (req, res) {
	db.query("SELECT * FROM customer_details", function (err, data) {
		res.send(data);
	})
})

router.post('/getsalesview', function (req, res) {
	db.query("SELECT * FROM sales ORDER BY id ASC , name ASC", function (err, data) {
		if (err) throw err;
		res.send(data);
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
	let post = 'SELECT DISTINCT s.id,s.square_meters,s.days_open,s.times,CONCAT(s.street_name," ",s.street_number," ",s.city," ",s.state," ",s.zipcode) AS adrress, s.phone_number FROM supermarkets AS s, transcaction AS t, customer AS c \
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
	let id = req.query.id
	let post = `SELECT CASE WHEN YEAR(date) = YEAR(CURRENT_DATE) THEN WEEK(date) - WEEK(CURRENT_DATE) WHEN YEAR(date) < YEAR(CURRENT_DATE) THEN WEEK(date) END AS week ,YEAR(date) AS year, COUNT(card_id)/7 AS average FROM transcaction  WHERE card_id = ${id} GROUP by week,year ORDER BY year ASC, week ASC`
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})

router.post('/customermeanmonth', function (req, res) {
	let id = req.query.id;
	let post = `SELECT MONTH(date) AS month,YEAR(date) AS year, COUNT(card_id)/30 AS average FROM transcaction  WHERE card_id = ${id} GROUP by month,year ORDER BY year ASC, month ASC`
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})

router.post('/addcustomer', function (req, res) {
	db.query('INSERT INTO customer SET?', req.body, function (err) {
		if (err) {
			res.send({ msg: err.sqlMessage, success: false })
		} else {
			res.send({ success: true })
		}
	})
})

router.post('/editcustomer', function (req, res) {
	let id = req.query.id;
	let post = "UPDATE customer SET ? WHERE card_id = " + id;
	db.query(post, req.body, function (err) {
		if (err) {
			console.log(err)
			res.send({ success: false, msg: err.sqlMessage })
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
	let query = db.query(sql, req.body, (err, result) => {
		if (err) {
			console.log(err);
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
	let sqlquery = "SELECT i.name, i.Barcode, c.name as catname,i.signature_item,i.current_price \
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
	let sql = 'SELECT i.name, i.Barcode,d.name as catname,i.category_id,i.signature_item,i.current_price,c.self,c.aisle \
	FROM item AS i , carries AS c, category AS d\
	WHERE c.barcode = i.Barcode && d.category_id = i.category_id && i.Barcode=' + barcode + '&& c.store_id =' + id;
	db.query(sql, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});//get item and posiition in store

router.get('/getitem2', function (req, res) {
	var barcode = req.query.barcode;
	let sql = 'SELECT i.name, i.Barcode,d.name as catname, d.category_id,i.signature_item,i.current_price \
	FROM item AS i ,  category AS d\
	WHERE d.category_id = i.category_id && i.Barcode=' + barcode;
	db.query(sql, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});//just get item values

router.get('/getcategories', function (req, res) {
	db.query('SELECT * FROM category', function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	})
});// get all categories for forms


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
	let post = "SELECT i.name, i.Barcode,cat.name as catname,i.signature_item,i.current_price , SUM(tc.amount) as occurences\
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
})// get customer favourite items

router.post('/getsuperitems', function (req, res) {
	let id = req.query.id;
	let sql =
		'SELECT i.name ,i.Barcode,d.name as catname,i.signature_item,i.current_price,c.self,c.aisle FROM item as i, carries as c, category as d  WHERE c.store_id= ' +
		id +
		' && c.barcode = i.Barcode && d.category_id = i.category_id';

	db.query(sql, function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});// get all item that supermarket carries

router.post('/getsuperitemsall', function (req, res) {
	db.query('SELECT Barcode, name FROM item', function (err, result) {
		if (err) console.log(err);
		res.send(result);
	});
});// get all name-barcode for forms

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
});// remove item from supermarket

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
});//

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
})//

router.post('/updateitem', function (req, res) {
	let barcode = req.query.barcode;
	let post = 'UPDATE item SET ? WHERE BARCODE=' + barcode;
	db.query(post, req.body, function (err, result) {
		if (err) {
			console.log(err);
			res.send(false);
		} else {
			res.send(true);
		}
	})
})//

router.post('/deleteitem', function (req, res) {
	let barcode = req.query.barcode;
	db.query("DELETE FROM item WHERE item.Barcode =" + barcode, function (err, result) {
		if (err) {
			res.send(false);
		} else {
			res.send(true);
		}
	})
})//

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

router.get('/itemnames', function (req, res) {
	let post = "UPDATE item SET name = substring(MD5(RAND()),1,8)";
	db.query(post, function (err, result) {
		if (err) throw err;
		res.sendStatus(200);
	})
})

let tid = 1000;

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
		date: randomDate(new Date(2018, 10, 1), new Date()) + " " + randomTime(),
		store_id: "",
		total_price: 0,
		total_pieces: 0
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
				tid++;
				db.query("SELECT Barcode FROM item", function (errr, data) {
					if (errr) {
						res.send(errr);
					}
					barcodes = Object.values(data);
					for (let index = 0; index < Math.floor(Math.random() * 10 + 1); index++) {
						let barcodet = barcodes[Math.floor(Math.random() * barcodes.length)]["Barcode"];
						let amountt = Math.floor(Math.random() * 10 + 1);
						var obj2 = {
							transcaction_id: tid,
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
							db.query('INSERT IGNORE INTO carries set ?', post, function () {

							})
						})
					}
				})
			})
		})
	})
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

router.post('/additem', function (req, res) {
	let post = "INSERT INTO item SET ?";
	db.query(post, req.body, function (err) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			db.query("SELECT c.name as catname,i.* FROM item as i, category as c WHERE i.category_id = c.category_id && i.Barcode =" + req.body.Barcode, function (er, resul) {
				if (err) {
					console.log(er);
					res.send({ success: false, msg: er.sqlMessage })
				} else {
					res.send({ success: true, dat: resul });
					console.log(resul);
				}
			})
		}
	})
})// add item and return inserted row

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
		'SELECT i.name, i.Barcode,d.name as catname,i.signature_item,i.current_price,c.self,c.aisle \
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
			res.send({ code: err.sqlMessage, success: false });
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
});// insert item and return values for supermarket

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
});// store provides categories get

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
});// get store transcactions

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
});// delete transcaction {!!! not used}

router.post('/deletesuper', (req, res) => {
	let sql = 'DELETE FROM supermarkets WHERE id = ?';
	let query = db.query(sql, req.body.id, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	});
});

router.post('/popularspots', function (req, res) {
	let id = req.query.id;
	let post = "SELECT c.aisle,c.self, COUNT(IF(c.aisle IS NOT NULL AND c.self IS NOT NULL, 1, NULL)) AS p  FROM (carries as c JOIN contains as tc JOIN transcaction as t ON t.id = tc.transcaction_id && tc.barcode = c.barcode) WHERE t.store_id = " + id + " GROUP BY c.aisle,c.self ORDER by p DESC LIMIT 10";
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}

	})
})// get store popular positions

router.post('/signaturetrust', function (req, res) {
	let id = req.query.id;
	let post = "SELECT ic.name,(SUM(i.signature_item)/(SUM(c.amount))*100) AS perc FROM (item as i JOIN contains as c JOIN category AS ic ON c.barcode = i.Barcode && ic.category_id = i.category_id), transcaction as t WHERE t.store_id = " + id + " &&  c.transcaction_id = t.id GROUP BY i.category_id"
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}
	})
})// get store signature item trust

router.post('/filtertranscaction', function (req, res) {
	let post = "SELECT * FROM transcaction WHERE ";
	var datekeys = ["YEAR(date)", "MONTH(date)", "DAY(date)"];
	var signs = ["<", ">"];
	let keys = Object.keys(req.body);
	let values = Object.values(req.body);
	let sign = [];
	for (let i = 0; i < keys.length; i++) {
		let tempsign = values[i].substr(0, 1);
		var currvalue;
		signs.forEach(element => {
			if (tempsign == element) {
				sign.push(element);
			}
		});
		if (sign.length == i) {
			sign.push("=")
			currvalue = values[i]
		} else {
			currvalue = values[i].substr(1);
		}
		if (keys[i] == "payment_method") {
			currvalue = "'" + currvalue + "'"
		}
		if (keys[i] == "date") {
			var datesplit = values[i].split("-");
			for (let j = 0; j < datesplit.length; j++) {
				if (sign[i] == "=") {
					currvalue = datesplit[j]
				} else {
					currvalue = datesplit[j].substr(1);
				}
				post += datekeys[j] + sign[i] + currvalue;
				if (j !== datesplit.length - 1) {
					post += " && "
				}
			}
			if (i !== keys.length - 1) {
				post += " && ";
			}
			continue;
		}
		post = post + keys[i] + sign[i] + currvalue;
		if (i !== keys.length - 1) {
			post += " && ";
		}
	}
	console.log(post)
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}
	})

})// for filtering transcactions

router.post('/moneyspend', function (req, res) {
	let id = req.query.id;
	let post = "SELECT  DATE_FORMAT(t.date,'%H:00') as time,SUM(t.total_price)/COUNT(*) as p FROM transcaction as t WHERE t.store_id = " + id + "  GROUP BY time ORDER BY time ASC";
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}
	})
})// money spend each hour for stores

router.post('/agetimesuper', function (req, res) {
	let id = req.query.id;
	let post = "SELECT CASE  WHEN YEAR(CURRENT_DATE()) - YEAR(c.birth_date) <= 18 THEN '18 or less'\
		WHEN YEAR(CURRENT_DATE()) - YEAR(c.birth_date) < 40 THEN '19-40'\
		WHEN YEAR(CURRENT_DATE()) - YEAR(c.birth_date) < 70 THEN '40 plus' END\
	as age, DATE_FORMAT(t.date,'%H:00') as time, COUNT(*)/(SELECT COUNT(*) FROM transcaction as t1 WHERE DATE_FORMAT(t1.date,'%H:00') = time && t1.store_id = "+ id + " )*100 as visits  FROM (customer as c JOIN transcaction as t ON t.card_id = c.card_id) WHERE t.store_id = " + id + " GROUP BY age,time\
	ORDER BY time ASC , age	ASC"
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}
	})
})// age activity each hour

router.post('/popularpairs', function (req, res) {
	let id = req.query.id;
	let post = "SELECT i1.name as name1,i2.name as name2,COUNT(c1.barcode) AS weight FROM\
	(contains as c1 JOIN contains as c2 JOIN item as i1 JOIN item as i2 ON c1.barcode<c2.barcode && i1.Barcode = c1.barcode && i2.Barcode = c2.barcode ),\
	transcaction AS t  WHERE t.store_id = "+ id + " && c2.transcaction_id = t.id  &&  c1.transcaction_id = c2.transcaction_id \
	GROUP BY c1.barcode,c2.barcode  ORDER BY weight  DESC LIMIT 10"
	db.query(post, function (err, result) {
		if (err) {
			console.log(err);
			res.send({ success: false, msg: err.sqlMessage })
		} else {
			res.send({ success: true, dat: result });
		}
	})
})// popular pair combinations as bought

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

router.post('/getcustomer', function (req, res) {
	let id = req.query.id;
	let post = `SELECT * FROM customer WHERE card_id = ${id}`;
	db.query(post, function (err, result) {
		if (err) throw err;
		res.send(result);
	})
})// reduntant

app.use(express.static(__dirname + '/client', { index: false }));

app.use('/', router);

app.listen('3000', () => {
	console.log('server start');
});
