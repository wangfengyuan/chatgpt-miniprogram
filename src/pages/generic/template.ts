const template = (data: any) => {
  let { prompt } = data
  const doubleBraceRegex = /{{(\d+|[a-z$_][a-z\d$_]*?(?:\.[a-z\d$_]*?)*?)}}/gi

  if (doubleBraceRegex.test(prompt)) {
    prompt = prompt.replace(doubleBraceRegex, (_, key) => {
      let result = data
      for (const property of key.split('.'))
        result = result ? result[property].val : ''
      return result
    })
  }

  return prompt
}

export default template
