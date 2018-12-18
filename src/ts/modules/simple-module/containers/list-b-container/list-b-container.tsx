import * as React from 'react';
import { withRouter } from 'react-router';
import IList from '../../interfaces/IList';
import Actions from '../../redux/actions';
import { IBaseContainerState } from '../../../../containers/base-container';
import { ListContainer } from '../list-container';

interface IListContainerProps {
    list: IList;
}

interface IListContainerState extends IBaseContainerState {
    invalidCount: number;
}

class ListBContainer extends ListContainer<IListContainerProps, IListContainerState>{

    constructor(props) {
        super(props);
    }

    state = {
        items: this.props.list.items,
        invalidCount: 0
    }

    itemsRefs = [];

    selectItemHandler = (item: any) => Actions.selectItem(item);

    removeItemHandler = (item: any) => Actions.removeItem(item);

    clickItemHandler = (item: any) => console.log(item);

    sort = (flag?: boolean) => Actions.sortList(flag);

    itemChanged = (item) => {
        const count = this.itemsRefs.filter(r => r && r.state && typeof r.state.isValid === 'boolean' && !r.state.isValid).length;
        this.setState({ invalidCount: count });
        // тут можно считать как угодно, 
        // меняя основной стор экшенами, Actions.setItemValidation(item) если нужен доступ к валидации из других частей приложения
        // заводить статическую переменную в сервисе ListService.localStore[item.id] = item; 
        // если достаточно обработать на форме, так же если этот список часть составного стейта то можно прокинуть в родителя через событие
        // this.props.onChangeListValid()
        // в данном примере если необходимо можно собирать указатели на элементы
    }

    defineItemProps(item) {
        const props = super.defineItemProps(item);
        this.itemsRefs = [];
        return {
            ...props,
            onChange: this.itemChanged,
            ref: (itemElem) => this.itemsRefs.push(itemElem)
        }
    }

    componentWillReceiveProps(nextProps: IListContainerProps) {
        this.setState({ items: nextProps.list.items });
    }

    loadList = () =>
        Actions.loadList(this.state.items.length + 1, 10);

    view() {
        const custom = <div onClick={() => this.loadList()}>load</div>
        return <>
            invalidCount={this.state.invalidCount}
            {super.view(custom)}
        </>
    }
}

export default withRouter(ListBContainer);