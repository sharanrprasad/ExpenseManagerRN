// @flow
import type { IAppNetInfoSubscriber } from "../models/InterfaceTypes";

class AppNetInfo {

    connectionType : string;
    subscribers : Array<IAppNetInfoSubscriber>;

    constructor(info ?:string){
        this.connectionType = info ||  "none";
        this.subscribers = [];
    }

    handleConnectivityChange = (info:any) => {
        console.log("connection info changed-",info);
        this.setCurrentNetInfo(info);
    }

    isConnected = ():boolean => {
        if(this.connectionType === "none"){
            return false;
        }
        return true;
    }

    setCurrentNetInfo =  (info:any) => {
        this.connectionType = info.type;
        this.notifyAll();
    }


    subscribe(observer: IAppNetInfoSubscriber){
        if(this.subscribers.indexOf(observer) === -1){
            this.subscribers.push(observer);
        }
    }

    unsubscribe(observer : IAppNetInfoSubscriber){
       let index =  this.subscribers.indexOf(observer);
       this.subscribers.splice(index,1);
    }

    notifyAll(){
        this.subscribers.forEach(observer => observer.notify(this.isConnected()));
    }
}

export default new AppNetInfo();
