// @flow

import { NavigationActions } from "react-navigation";
import type { NavigationProp } from "react-navigation";

let _navigator: NavigationProp<{}>;

function setTopLevelNavigator(navigatorRef: NavigationProp<{}>) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params?: Object) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

export default {
    setTopLevelNavigator,
    navigate
}
