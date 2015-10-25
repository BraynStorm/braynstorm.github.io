var Mat4 = (function(){
	function Mat4(){
		var m = [
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[0,0,0,1]
		];
		
		this.get1DArray = function (){
			var mm = [16];
			
			mm[0] = m[0][0];						mm[4] = m[1][0];				mm[8]  = m[2][0];						mm[12] = m[3][0];
			mm[1] = m[0][1];						mm[5] = m[1][1];				mm[9]  = m[2][1];						mm[13] = m[3][1];
			mm[2] = m[0][2];						mm[6] = m[1][2];				mm[10] = m[2][2];						mm[14] = m[3][2];
			mm[3] = m[0][3];						mm[7] = m[1][3];				mm[11] = m[2][3];						mm[15] = m[3][3];
			
			return mm;
		}
		
		this.projection = function(zNear, zFar, fov, aspect){
			var zRange = zNear - zFar;
			var tanHalfFOV = Math.tan(toRadians(fov/2));
			
			m[0][0] = 1.0 / (aspect * tanHalfFOV);	m[1][0] = 0;					m[2][0] = 0;							m[3][0] = 0;
			m[0][1] = 0;							m[1][1] = 1.0 / tanHalfFOV;		m[2][1] = 0;							m[3][1] = 0;
			m[0][2] = 0;							m[1][2] = 0;					m[2][2] = (-zNear - zFar) / zRange;		m[3][2] = 2 * zFar * zNear / zRange;
			m[0][3] = 0;							m[1][3] = 0;					m[2][3] = 1;							m[3][3] = 0;
			
			return this;
		}
		
		this.mul = function(m2){
			var res = new Mat4();
			
			for(var i = 0; i < 4; i++){
				for(var j = 0; j < 4; j++){
					res.set(j, i, 	m[i][0] * m2.get(0, j) +
									m[i][1] * m2.get(1, j) +
									m[i][2] * m2.get(2, j) +
									m[i][3] * m2.get(3, j) );
				}
			}
			
			return res;
		}
		
		this.translate = function(t){
			m[0][0] = 1;					m[1][0] = 0;					m[2][0] = 0;						m[3][0] = 0;
			m[0][1] = 0;					m[1][1] = 1;					m[2][1] = 0;						m[3][1] = 0;
			m[0][2] = 0;					m[1][2] = 0;					m[2][2] = 1;						m[3][2] = 0;
			m[0][3] = t.getX();				m[1][3] = t.getY();				m[2][3] = t.getZ();						m[3][3] = 1;
			
			return this;
		};
		
		this.scale = function(s){
			m[0][0] = s.x;					m[1][0] = 0;					m[2][0] = 0;						m[3][0] = 0;
			m[0][1] = 0;					m[1][1] = s.y;					m[2][1] = 0;						m[3][1] = 0;
			m[0][2] = 0;					m[1][2] = 0;					m[2][2] = s.z;						m[3][2] = 0;
			m[0][3] = 0;					m[1][3] = 0;					m[2][3] = 0;						m[3][3] = 1;
			
			return this;
		};
		
		this.rotate = function(r){
			var rot = r.getRadianized();
			var rx = new Mat4();
			var ry = new Mat4();
			var rz = new Mat4();
			
			/* ...Errmahghurrrd... */ // FIXME
			rz.set(0, 0, Math.cos(rot.z));		rz.set(1, 0, Math.sin(rot.z));		rz.set(2, 0, 0);					rz.set(3, 0,0);
			rz.set(0, 1, -Math.sin(rot.z));		rz.set(1, 1, Math.cos(rot.z));		rz.set(2, 1, 0);					rz.set(3, 1,0);
			rz.set(0, 2, 0);					rz.set(1, 2, 0);					rz.set(2, 2, 1);					rz.set(3, 2,0);
			rz.set(0, 3, 0);					rz.set(1, 3, 0);					rz.set(2, 3, 0);					rz.set(3, 3,1);
                                                             
                                                             
			rx.set(0, 0, 1);					rx.set(1, 0, 0);					rx.set(2, 0, 0);					rx.set(3, 0, 0);
			rx.set(0, 1, 0);					rx.set(1, 1, Math.cos(rot.x));		rx.set(2, 1, Math.sin(rot.x));		rx.set(3, 1, 0);
			rx.set(0, 2, 0);					rx.set(1, 2, -Math.sin(rot.x));		rx.set(2, 2, Math.cos(rot.x));		rx.set(3, 2, 0);
			rx.set(0, 3, 0);					rx.set(1, 3, 0);					rx.set(2, 3, 0);					rx.set(3, 3, 1);
                                                             
                                                             
			ry.set(0, 0, Math.cos(rot.y));		ry.set(1, 0, 0);					ry.set(2, 0, Math.sin(rot.y));		ry.set(3, 0, 0);
			ry.set(0, 1, 0);					ry.set(1, 1, 1);					ry.set(2, 1, 0);					ry.set(3, 1, 0);
			ry.set(0, 2, -Math.sin(rot.y));		ry.set(1, 2, 0);					ry.set(2, 2, Math.cos(rot.y));		ry.set(3, 2, 0);
			ry.set(0, 3, 0);					ry.set(1, 3, 0);					ry.set(2, 3, 0);					ry.set(3, 3, 1);
			                                                 
			
			// rz * ry * rx;
			m = rz.mul(ry.mul(rx)).get2DArray();
			
			return this;
		}
		
		this.camera = function (forward, up){
			var f = forward;
			var r = up.getCrossed(f);
			var u = f.getCrossed(r); // TODO unneccessary? (==u)
			
			m[0][0] = r.x;				m[1][0] = u.x;				m[2][0] = f.x;				m[3][0] = 0;
			m[0][1] = r.y;				m[1][1] = u.y;				m[2][1] = f.y;				m[3][1] = 0;
			m[0][2] = r.z;				m[1][2] = u.z;				m[2][2] = f.z;				m[3][2] = 0;
			m[0][3] = 0;				m[1][3] = 0;				m[2][3] = 0;				m[3][3] = 1;
			
			return this;
		}
		
		this.set = function(x, y, value) {
			m[x][y] = value;
		}
		
		this.get2DArray = function(){
			return m;
		}
		
		this.get = function(x, y) {
			return m[x][y];
		}
	}
	
	return Mat4;
})();