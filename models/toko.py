from api.database import db, ma

## 実テーブル
class Toko(db.Model): 
    __tablename__ = "toko"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    system_nm = db.Column(db.String(), primary_key=True) 
    dantai_nm = db.Column(db.String(), primary_key=True) 
    tokosha_nm = db.Column(db.String(), primary_key=True) 
    rank1 = db.Column(db.Integer, primary_key=True) 
    comment1 = db.Column(db.String(), primary_key=True) 
    rank2 = db.Column(db.Integer, primary_key=True) 
    comment2 = db.Column(db.String(), primary_key=True) 
    ymdt = db.Column(db.DATETIME, nullable=False,primary_key=True)

class TokoSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = Toko
            load_instance = True
