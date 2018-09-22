// @flow
import { Toast } from "native-base";

export type ToastType = "danger"| "success" | "warning" | "";


export default  class ToastPresenter {

    message:string;
    duration : number;
    buttonAction : () =>  mixed;
    toastType : ToastType;
    buttonText : string;

    constructor(message:string){
        this.message = message;
        this.duration = 3000;
        this.toastType = "";
    }

    static  getToastLayout(message:string):ToastPresenter{
        return new ToastPresenter(message);
    }

    setDuration(duration : number): ToastPresenter{
        this.duration = duration;
        return this;
    }

    setToastType(type:ToastType) : ToastPresenter{
        this.toastType = type;
        return this;
    }

    makeButtonToast(buttonText : string, action : () => mixed) : ToastPresenter{
        this.buttonAction = action;
        this.buttonText = buttonText;
        this.duration = 0;
        return this;
    }


    build(){
        Toast.show({
            text: this.message,
            duration : this.duration,
            onClose: reason => {
                if (reason === "user" && this.buttonAction) {
                    this.buttonAction();
                }
            },
            buttonText : this.buttonText || "",
            type : this.toastType || "",
            buttonStyle : {backgroundColor : "#d6d6d6"}
        });
    }

}

