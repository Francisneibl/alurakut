const Input = ({ label, register, required, ...props }) => (
  <>
    <input {...register(label, { required })} {...props} />
  </>
)

export default Input
