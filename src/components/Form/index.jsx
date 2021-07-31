const Form = ({ children, handleSubmit, ...props }) => {
  return <form onSubmit={handleSubmit}>{children}</form>
}

export default Form
