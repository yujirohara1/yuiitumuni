from api.database import db, ma

## 実テーブル
class TokoRadar(db.Model): 
    __tablename__ = "toko_radar"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    system_nm = db.Column(db.String(), primary_key=True) 
    dantai_nm = db.Column(db.String(), primary_key=False) 
    tokosha_nm = db.Column(db.String(), primary_key=False) 
    hyoka_shubetu = db.Column(db.Integer, primary_key=True) 
    hyoka_value = db.Column(db.Integer, primary_key=True) 
    ymdt = db.Column(db.DATETIME, nullable=False,primary_key=True)

class TokoRadarSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = TokoRadar
            load_instance = True


#v_tokoradar_groupby_vendor
class VTokoRadarGroupByVendor(db.Model): 
    __tablename__ = "v_tokoradar_groupby_vendor"
    vendor_nm = db.Column(db.String(), primary_key=True) 
    shubetu1_avg = db.Column(db.Float , primary_key=True) 
    shubetu2_avg = db.Column(db.Float , primary_key=True) 
    shubetu3_avg = db.Column(db.Float , primary_key=True) 
    shubetu4_avg = db.Column(db.Float , primary_key=True) 
    shubetu5_avg = db.Column(db.Float , primary_key=True) 
    shubetu6_avg = db.Column(db.Float , primary_key=True) 
    shubetu7_avg = db.Column(db.Float , primary_key=True) 

class VTokoRadarGroupByVendorSchema(ma.SQLAlchemyAutoSchema):
      class Meta:
            model = VTokoRadarGroupByVendor
            load_instance = True

