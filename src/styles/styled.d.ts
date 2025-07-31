import 'styled-components';
import { Tema } from './tema';

declare module 'styled-components' {
  export interface DefaultTheme extends Tema {}
}