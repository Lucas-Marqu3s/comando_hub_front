import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div
        className="h-full border-r bg-muted p-10 text-muted-foreground flex flex-col justify-between"
        style={{
          backgroundImage: "url('/src/assets/images/login.svg')",
          backgroundSize: 'cover',
        }}
      >
        {/* <footer className="text-xs text-start absolute bottom-0 left-0 p-1 text-purple-100">
          Todos os direitos reservados. &copy; Comando Log. new Date().getFullYear()
        </footer> */}
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
