import './SearchPanel.scss'
import SearchPanel from './SearchPanel.hbs?raw'
import Block from '../../tools/Block'

export class SearchPanelBlock extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }
    render() {
        return this.compile(SearchPanel, this.props, this.props.className)
    }
}
