export default (actionCreator, payload, formActions) => {
  formActions.setSubmitting(true)
  actionCreator({
    ...payload,
    resolve: () => {
      formActions.setSubmitting(false)
    },
    reject: ex => {
      const res = ex.response ? ex.response : ex
      const errors = res.data || res.error || res

      if (typeof errors === 'object') {
        const { message, fieldErrors, ...otherFieldErrors } = errors

        formActions.setErrors({
          _error: message,
          ...fieldErrors,
          ...otherFieldErrors
        })
      } else {
        formActions.setErrors({
          _error: 'Internal Server Error'
        })
      }
      formActions.setSubmitting(false)
    }
  })
}
