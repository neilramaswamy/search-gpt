// Parse out the query string from the URL
const params = new URLSearchParams(window.location.search)
const query = params.get('q')

const textarea = document.querySelector('textarea[data-id="root"]')
const submitButton = textarea?.parentElement.querySelector('button')

if (!textarea || !submitButton) {
    // Probably should redirect to a different search engine
    window.location.href = `https://neeva.com/search?q=${query}`
}

// Inject the query into the text field
injectIntoTextField(textarea, query)
submitButton.click()

// Wizardry: https://stackoverflow.com/a/61110332
function injectIntoTextField(textarea, query) {
    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
    ).set
    nativeTextAreaValueSetter.call(textarea, query)

    const event = new Event('input', { bubbles: true })
    textarea.dispatchEvent(event)
}
