import { BUIPrincipalServiceJPO } from "./bui.bUIPrincipalService";

export class BUIPrincipalServiceJPOImp extends BUIPrincipalServiceJPO {

    actualizarIP(fields : {
        nombre : string,
        ips : string,
        servers : string
    }, call ?: { (resp: any) }){
        this.jpo.get("actualizarIP",{
            fields : fields,
            response : (rs) => {
                if(call){
                    call(rs);
                }
            },
            showLoader : true
        });
    }

    executeDML(fields : {
        type : string,
        query : string
    }, call ?: { (resp: any) }){
        this.jpo.get("executeDML",{
            fields : fields,
            response : (rs) => {
                if(call){
                    call(rs);
                }
            },
            showLoader : false
        });
    }

}