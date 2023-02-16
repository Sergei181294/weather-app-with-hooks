import  { FC, ChangeEvent } from "react"
import css from "./dropdawn.module.css"


interface DropdawnProps {
       value: string;
       units: {value: string, label: string}[];
       onChange: (value: string, e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdawn: FC<DropdawnProps> = ({ value, units, onChange }) => {
       return (
              <select className = { css.dropdawn } value = { value } onChange = {(e) => onChange(e.target.value, e) }>
                     {units.map((unit) => {
                            return <option key = { unit.value } value = { unit.value }>{ unit.label }</option>
                     })}
              </select>
       )

} 
