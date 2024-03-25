import './PageTitle.scss'
import PageTitle from './PageTitle.hbs?raw'
import Block from '../../tools/Block'

export class PageTitleBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(PageTitle, this.props, this.props.className)
    }
}
