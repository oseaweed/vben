import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
<<<<<<< HEAD
  Radio as ARadio,
  Transfer as ATransfer,
} from 'ant-design-vue';

const compList = [AntButton.Group, ARadio, ARadio.Group, ARadio.Button, ATransfer];
=======
} from 'ant-design-vue';

const compList = [AntButton.Group];
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
