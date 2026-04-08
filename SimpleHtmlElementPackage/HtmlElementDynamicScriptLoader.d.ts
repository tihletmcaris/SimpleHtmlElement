export default class HtmlElementDynamicScriptLoader {
    script: string | null;
    executable: ((...args: any[]) => any) | null;

    loadScript(url: string, callback?: () => void): void;
    execute(): any;
    canExecute(): Promise<boolean>;
}
