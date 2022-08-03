type Chinese<T extends string | number | bigint | boolean> = `${T}`;

interface ActionState {
  Image: string;
  TitleAlignment: 'top' | 'middle' | 'bottom';
  FontSize: Chinese<number>;
}

interface Action {
  Icon: string;
  Name: string;
  States: ActionState[];
  Tooltip: string;
  UUID: string;
}

interface OS {
  Platform: 'mac' | 'windows';
  MinimumVersion: string;
}

export interface Manifest {
  Actions: Action[];
  SDKVersion: 2;
  Author: string;
  CodePath: string;
  Description: string;
  Name: string;
  Icon: string;
  URL: string;
  Version: string;
  OS: OS[];
  Software: {
    MinimumVersion: string;
  };
}
