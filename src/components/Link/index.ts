import Link from './Link.hbs?raw'
import Block from '../../tools/Block'

export default class LinkBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }

    render() {
        return this.compile(Link, this.props)
    }
}
