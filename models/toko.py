from api.database import db, ma

## 実テーブル
class Toko(db.Model): 
    __tablename__ = "toko"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    system_nm = db.Column(db.String(), primary_key=True) 
    dantai_nm = db.Column(db.String(), primary_key=False) 
    tokosha_nm = db.Column(db.String(), primary_key=False) 
    rank1 = db.Column(db.Integer, primary_key=True) 
    comment1 = db.Column(db.String(), primary_key=True) 
    rank2 = db.Column(db.Integer, primary_key=False) 
    comment2 = db.Column(db.String(), primary_key=False) 
    ymdt = db.Column(db.DATETIME, nullable=False,primary_key=True)

class TokoSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = Toko
            load_instance = True


class VTokoGroupbyVendor(db.Model): 
    __tablename__ = "v_toko_groupby_vendor"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    kensu = db.Column(db.Integer, primary_key=True) 
    rank1_avg = db.Column(db.Float , primary_key=True) 

class VTokoGroupbyVendorSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = VTokoGroupbyVendor
            load_instance = True

class VTokoGroupbySystem(db.Model): 
    __tablename__ = "v_toko_groupby_system"
    system_nm = db.Column(db.String(), primary_key=True) 
    kensu = db.Column(db.Integer, primary_key=True) 
    rank1_avg = db.Column(db.Float , primary_key=True) 

class VTokoGroupbySystemSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = VTokoGroupbySystem
            load_instance = True
