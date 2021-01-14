import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { Json } from 'enzyme-to-json';
import { Plugin } from 'pretty-format';
import { StyledProps } from './../types';

interface SerializerMap extends Json {
    node: {
        type: {
            componentStyle?: {
                baseStyle?: {
                    rules: (string | ((props: StyledProps) => string))[];
                };
                rules: (string | ((props: StyledProps) => string))[];
            };
        };
    };
}

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(
    (createSerializer({
        map: (value: SerializerMap) => {
            if (value.node.type?.componentStyle?.rules) {
                const styles = [
                    ...(value.node.type.componentStyle.baseStyle?.rules ?? []),
                    ...value.node.type.componentStyle.rules.map((rule) =>
                        typeof rule === 'string'
                            ? rule
                            : rule({
                                  ...value.props,
                                  theme: {
                                      brightBlue: 'theme.brightBlue',
                                      darkBlue: 'theme.darkBlue',
                                      lightBlue: 'theme.lightBlue',
                                  },
                              }),
                    ),
                ]
                    .filter(Boolean)
                    .join('')
                    .replace(/,(?!\s)/gm, '');

                return { ...value, props: { ...value.props, styles } };
            }
            return value;
        },
    }) as unknown) as Plugin,
);
