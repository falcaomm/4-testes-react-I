import { render, screen } from "@testing-library/react"
import userEvent  from "@testing-library/user-event"
import TodoList from '../components/TodoList'

describe('Testes ToDoList', () => {
    
    it("deve renderizar com o título", () => {
        render(<TodoList/>)
        //screen.debug()
        //screen.logTestingPlaygroundURL()
        const title = screen.getByText(/todo list/i) // usar regex para desconsiderar as maiculas e eventuais erros
        expect(title).toBeInTheDocument()
    })

    it("input inicia vazio", () => {
        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue('')//quero que comece como uma string vazia 
    })

    it("deve atualizar o valor do input ao digitar nele", async () => { // quando tem ação de usuário sempre usar async
        const user = userEvent.setup()

        render(<TodoList/>)
        const input = screen.getByPlaceholderText(/enter a todo/i)
        await user.type(input, "teste") // tradução - espera que o user digite "teste" no input - no caso aqui eu simulei a ação do usuário
        expect(input).toHaveValue('teste') // agora que eu simulei essa ação eu espero que o input tenha o valor teste
    })

    it("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla enter", async () => { 
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "teste{enter}")

        const task = screen.getByText(/teste/i)
        expect(task).toBeInTheDocument()
    })

    it("deve alterar o status da tarefa quando o botao for clicado", async () => {
        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "teste{enter}")

        const task = screen.getByText(/teste/i)

        const button = screen.getByText(/toggle/i)

        await user.click(button)
        expect(task).toHaveStyle('text-decoration: line-through') // a visualização não pega css

        await user.click(button)
        expect(task).toHaveStyle('text-decoration: none')
    })

    it("deve remover a tarefa quando o botão de deletar for clicado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)

        const input = screen.getByPlaceholderText(/enter a todo/i)

        await user.type(input, "teste{enter}")


        const button = screen.getByText(/delete/i)

        await user.click(button)
        const task = screen.queryByText(/teste/i)

        expect(task).toBeNull()
    })

    
})