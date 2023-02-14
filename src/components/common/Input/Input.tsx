import { FC, ChangeEvent } from "react"
import css from "./styles.module.css"

interface InputProps {
       value?: string;
       disabled?: boolean;
       onChange: ( e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ value, disabled, onChange }) => {
       return (
              <input
                     className={css.search}
                     value={value}
                     disabled={disabled}
                     onChange={ onChange}
              />
       )
}


