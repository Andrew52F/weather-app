export interface ButtonProps {
  children?: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset'
}
