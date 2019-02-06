import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
import * as A from '../../components/example/base-example-a';
import * as B from '../../components/example/base-example-b';
import * as C from '../../components/example/base-example-c';

class ExampleContainer extends BaseContainer<any, any>{

    constructor(props) {
        super(props);
    }

    view() {
        return (
            <div className="example-container" >
                <div>
                    <br />
                    <A.Component title="title-A Component" subTitle="subTitle-A Component" />
                    <br />
                    <A.ExtendedComponentA title="title-A ExtendedComponentA" subTitle="subTitle-A ExtendedComponentA" selected />
                    <br />
                    <A.ExtendedComponentB title="title-A ExtendedComponentB" subTitle="subTitle-A ExtendedComponentB" />
                    <br />
                    <A.ExtendedComponentC title="title-A ExtendedComponentC" subTitle="subTitle-A ExtendedComponentC" selected/>
                </div>
                <hr />
                <div>
                    <br />
                    <B.Component title="title-A Component" subTitle="subTitle-A Component" />
                    <br />
                    <B.ExtendedComponentA title="title-B ExtendedComponentA" subTitle="subTitle-B ExtendedComponentA" selected />
                    <br />
                    <B.ExtendedComponentB title="title-B ExtendedComponentB" subTitle="subTitle-B ExtendedComponentB" />
                    <br />
                    <B.ExtendedComponentC title="title-B ExtendedComponentC" subTitle="subTitle-B ExtendedComponentC" selected/>
                </div>
                <hr />
                <div>
                    <br />
                    <C.Component title="title-A Component" subTitle="subTitle-A Component" />
                    <br />
                    <C.ExtendedComponentA title="title-C ExtendedComponentA" subTitle="subTitle-C ExtendedComponentA" selected />
                    <br />
                    <C.ExtendedComponentB title="title-C ExtendedComponentB" subTitle="subTitle-C ExtendedComponentB" />
                    <br />
                    <C.ExtendedComponentC title="title-C ExtendedComponentC" subTitle="subTitle-C ExtendedComponentC" selected/>
                </div>
            </div>
        );
    }
}

export default withRouter(ExampleContainer);