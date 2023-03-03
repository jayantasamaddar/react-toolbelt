interface Object {
  [k: string]: any;
}

interface NormalizationInput {
  'remove-trailing'?: boolean;
  'remove-indent'?: boolean;
  'left-trim'?: boolean;
  'right-trim'?: boolean;
  'break-lines'?: number;
  indent?: number;
  'remove-initial-line-feed'?: boolean;
  'tabs-to-spaces'?: number;
  'spaces-to-tabs'?: number;
}

type CamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
  : S;

// type NormalizeAttributesKeys = keyof NormalizeAttributes extends infer K
//   ? K extends string
//     ? { [P in K as CamelCase<P>]: P }
//     : never
//   : never;

/** Map CamelCasedKeys to same values of kebab-case */
// type NormalizeAttributesCamelCased = {
//   [K in keyof NormalizeAttributes as CamelCase<K>]: NormalizeAttributes[K];
// };

/** All camelCasedKeys from kebab-cased keys in an interface as an Union Type */
// type NormalizeAttributesCamelCasedKeys = CamelCase<keyof NormalizeAttributes>;

const assign =
  Object.assign ||
  function (obj1: Object, obj2: Object) {
    for (const name in obj2) {
      if (obj2.hasOwnProperty(name)) {
        obj1[name] = obj2[name];
      }
    }
    return obj1;
  };

function toCamelCase<T extends string>(value: T): CamelCase<T> {
  return String(value).replace(/-(\w)/g, function (match, firstChar) {
    return firstChar.toUpperCase();
  }) as CamelCase<T>;
}

function tabLen(str: string) {
  let res = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str.charCodeAt(i) == '\t'.charCodeAt(0)) {
      res += 3;
    }
  }
  return str.length + res;
}

export default class NormalizeWhitespace {
  defaults: NormalizationInput;
  constructor(defaults: NormalizationInput) {
    this.defaults = assign({}, defaults);
  }
  setDefaults(defaults: NormalizationInput) {
    this.defaults = assign(this.defaults, defaults);
  }
  normalize(input: string, settings?: NormalizationInput) {
    settings = assign(this.defaults, settings);

    for (const name in settings) {
      const methodName = toCamelCase(name as keyof NormalizationInput);
      if (name !== 'normalize' && name in settings && this[methodName]) {
        const value = Number(settings[name as keyof NormalizationInput]);
        input = this[methodName].call(this, input, value);
      }
    }

    return input;
  }
  /*
   * Normalization methods
   */
  leftTrim(input: string) {
    return input.replace(/^\s+/, '');
  }
  rightTrim(input: string) {
    return input.replace(/\s+$/, '');
  }
  tabsToSpaces(input: string, spaces: number) {
    spaces = spaces | 0 || 4;
    return input.replace(/\t/g, new Array(++spaces).join(' '));
  }
  spacesToTabs(input: string, spaces: number) {
    spaces = spaces | 0 || 4;
    return input.replace(RegExp(' {' + spaces + '}', 'g'), '\t');
  }
  removeTrailing(input: string) {
    return input.replace(/\s*?$/gm, '');
  }
  // Support for deprecated plugin remove-initial-line-feed
  removeInitialLineFeed(input: string) {
    return input.replace(/^(?:\r?\n|\r)/, '');
  }
  removeIndent(input: string) {
    const indents = input.match(/^[^\S\n\r]*(?=\S)/gm);

    if (!indents || !indents[0].length) {
      return input;
    }

    indents.sort(function (a, b) {
      return a.length - b.length;
    });

    if (!indents[0].length) {
      return input;
    }

    return input.replace(RegExp('^' + indents[0], 'gm'), '');
  }
  indent(input: string, tabs: number) {
    if (typeof tabs !== 'number') return input;
    return input.replace(
      /^[^\S\n\r]*(?=\S)/gm,
      new Array(++tabs).join('\t') + '$&'
    );
  }
  breakLines(input: string, characters: number | boolean) {
    characters = characters === true ? 80 : Number(characters) | 0 || 80;

    const lines = input.split('\n');
    for (let i = 0; i < lines.length; ++i) {
      if (tabLen(lines[i]) <= characters) {
        continue;
      }

      const line = lines[i].split(/(\s+)/g);
      let len = 0;

      for (let j = 0; j < line.length; ++j) {
        let tl = tabLen(line[j]);
        len += tl;
        if (len > characters) {
          line[j] = '\n' + line[j];
          len = tl;
        }
      }
      lines[i] = line.join('');
    }
    return lines.join('\n');
  }
}
