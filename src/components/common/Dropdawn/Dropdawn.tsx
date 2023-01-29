import  { FC, ChangeEvent } from "react"
import { Units } from "../../../types/Units"
import css from "./dropdawn.module.css"


interface DropdawnProps {
       value: Units;
       units: {value: Units, label: string}[];
       onChange: (e:ChangeEvent<{value: Units} & HTMLSelectElement>) => void;
}

export const Dropdawn: FC<DropdawnProps> = ({ value, units, onChange }) => {
       return (
              <select className = { css.dropdawn } value = { value } onChange = { onChange }>
                     {units.map((unit) => {
                            return <option key = { unit.value } value = { unit.value }>{ unit.label }</option>
                     })}
              </select>
       )

} 
