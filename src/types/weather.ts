export interface Weather {
       main: { 
         temp: number; 
         feels_like: number;
         humidity:number;
         pressure: number;
       };
       wind: { speed: number };
       id?: number;
       weather: {icon: string}[];
     }
     