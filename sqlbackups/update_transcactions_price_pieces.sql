UPDATE transcaction as t  SET t.total_price = (SELECT TRUNCATE(SUM(c.amount*i.current_price),2) FROM contains as c, item as i WHERE c.transcaction_id = t.id AND c.barcode = i.barcode), t.total_pieces = (SELECT SUM(c.amount) FROM contains as c, item as i WHERE c.transcaction_id = t.id AND c.barcode = i.barcode)