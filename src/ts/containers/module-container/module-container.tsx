import * as React from 'react';
import BaseComponent, { IBaseComponentProps, IBaseComponentState } from '../../components/base-component';
import { ModuleService } from '../../services/module-service';
import { ExtModuleService } from '../../services/external-module-service';
import './style.scss';

export interface IModuleContainerProps extends IBaseComponentProps {
    moduleName?: any;
    internal?: any;
    manifest?: any;
}

interface IModuleContainerState extends IBaseComponentState {
    content?: JSX.Element;
    error?: boolean;
    ModuleComponent?: any;
}

export default class ModuleContainer extends BaseComponent<IModuleContainerProps, IModuleContainerState>{

    state = { error: false, content: null, ModuleComponent: null };

    refs: {
        [key: string]: (Element);
    };
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setContent(this.props.moduleName, this.props.internal, this.props.manifest);
    }

    setContent(name, internal, manifest) {
        if (internal) {
            ModuleService.getModuleElementInternal(name).then(
                component => {
                    if (component) {
                        this.setState({ ModuleComponent: component });
                    }
                    else {
                        this.setState({ error: true });
                    }
                }
            );
        }
        else {
            ExtModuleService.getPageElementAsync(manifest).then(
                component => {
                    if (component) {
                        let content = React.cloneElement<any, any>(component as any, { ...this.props })
                        this.setState({ content: content });
                    }
                    else {
                        this.setState({ error: true });
                    }
                }
            );
        }
    }

    view(): JSX.Element {
        const state = this.state;
        const ModuleComponent = state.ModuleComponent;
        return (
            <div className={"page-container"}>
                {!this.state.error &&
                    <>
                        {state.content && React.cloneElement<any, any>(state.content, {})}
                        {ModuleComponent && <ModuleComponent {...this.props} /> || null}
                    </>
                    ||
                    <div>loading error: {this.props.moduleName}</div>
                }
            </div>
        );
    }
}