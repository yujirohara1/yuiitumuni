from api.database import db, ma

## 実テーブル
class Bunya(db.Model): 
    __tablename__ = "bunya"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    system_nm = db.Column(db.String(), primary_key=True) 
    dantai_nm = db.Column(db.String(), primary_key=False) 
    tokosha_nm = db.Column(db.String(), primary_key=False) 
    bunya_cd = db.Column(db.Integer, primary_key=True) 
    ymdt = db.Column(db.DATETIME, nullable=False,primary_key=True)

class BunyaSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = Bunya
            load_instance = True


class VBunyaMapGroupbyVendor(db.Model): 
    __tablename__ = "v_bunyamap_groupby_vendor"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    bunya_cd = db.Column(db.Integer, primary_key=True) 
    bunya_nm = db.Column(db.String(), primary_key=True) 
    ryaku_nm = db.Column(db.String(), primary_key=True) 
    kensu = db.Column(db.Integer, primary_key=True) 

class VBunyaMapGroupbyVendorSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = VBunyaMapGroupbyVendor
            load_instance = True
