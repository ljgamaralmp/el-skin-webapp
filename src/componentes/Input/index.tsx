import styled from 'styled-components'

const InputContainer = styled.input`
    order: 1px solid #FFF;
    background:gray;
    border: 1px solid #FFF;
    padding: 20px 60px 20px 20px; /* Aumentado o padding à direita (60px) */
    border-radius: 50px;
    width: 500px; /* Aumentado para um tamanho mais usual */
    color: #FFF;
    font-size: 16px;
    margin-bottom: 30px;

    &::placeholder {
        color: #FFF;
        font-size: 16px;
    }
`
interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, onChange }: InputProps) {
   

    return (
        <div>
            <InputContainer type="text" placeholder="Pesquisar produtos, marcas ou categorias" value={value} onChange={onChange} />
        </div>
    )
}

export default Input