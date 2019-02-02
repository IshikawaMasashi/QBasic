/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are strings.
 */
export interface IStringDictionary<V> {
    [name: string]: V;
}
/**
 * An interface for a JavaScript object that
 * acts a dictionary. The keys are numbers.
 */
export interface INumberDictionary<V> {
    [idx: number]: V;
}
