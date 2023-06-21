import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from '../components/Counter'

describe('Testes Counter', () => {

    it("deve aumentar em 3 o contador quando o botão for clicado 3 vezes", async () => {

        const { getByText, findAllByText } = render(<Counter />)

        const button = getByText('+')
        userEvent.click(button)
        userEvent.click(button)
        userEvent.click(button)

        const counters = await findAllByText('3')
        expect(counters[0]).toBeInTheDocument()

    })

}) // entender melhor depois
