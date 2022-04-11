export class Validation {
    private input: string | any[]
    private compare: string = ''
    private compareField: string = ''

    private validation: string[] = []

    constructor(input: string | any[]) {
        this.input = input
    }

    required() {
        this.validation.push('required')
        return this
    }

    optional() {
        this.validation.push('optional')
        return this
    }

    arrayNotEmpty() {
        this.validation.push('arrayNotEmpty')
        return this
    }

    url() {
        this.validation.push('url')
        return this
    }

    email() {
        this.validation.push('email')
        return this
    }

    password() {
        this.validation.push('password')
        return this
    }

    passwordLogin() {
        this.validation.push('password-login')
        return this
    }

    compareFields(compare: string, fieldName: string) {
        this.validation.push('compare')
        this.compare = compare
        this.compareField = fieldName
        return this
    }

    checkLength() {
        this.validation.push('input-length')
        return this
    }

    validate() {
        for (const validate in this.validation) {
            switch (this.validation[validate]) {
                case 'required':
                    if (!requiredCheck(this.input?.toString())) return 'Please fill this area'
                    break
                case 'url':
                    if (this.validation.includes('optional') && this.input.toString().length === 0) return ''
                    if (!urlCheck(this.input?.toString())) return 'Your url format is wrong.'
                    break
                case 'arrayNotEmpty':
                    if (!arrayNotEmptyCheck(this.input as [])) return 'Array should not be empty.'
                    break
                case 'email':
                    if (!emailCheck(this.input?.toString())) return 'Your email address format is wrong.'
                    break
                case 'compare':
                    if (!isSame(this.input?.toString(), this.compare)) return `${this.compareField} are not same.`
                    break
                case 'password':
                    if (!passwordCheck(this.input?.toString()))
                        return 'There must be at least 1 number, 1 uppercase letter and 1 lowercase letter.'
                    break
                case 'password-login':
                    if (!passwordLoginCheck(this.input?.toString())) return 'There must be at least 4 characters.'
                    break
                case 'input-length':
                    if (!checkLengthOfString(this.input?.toString())) return 'Length of field must be up to 150 characters.'
            }
        }
        return ''
    }
}

function isSame(input: string, compare: string) {
    return input === compare
}

function arrayNotEmptyCheck(any: []) {
    return any.length != 0
}

function urlCheck(input: string) {
    // return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(input)
    return /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input)
}

function requiredCheck(input: string) {
    return input?.trim()?.length > 0
}

function emailCheck(input: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
}

function passwordCheck(input: string) {
    return /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(input)
}

function passwordLoginCheck(input: string) {
    return /^.{4,}$/.test(input)
}

function checkLengthOfString(input: string) {
    return input.length <= 150
}