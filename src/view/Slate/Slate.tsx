import {SlateEditor} from "@/src/components";

export function SlateEditorView() {
  return (
    <div>
      <h2 className={'font-bold text-3xl pb-4'}>
        Slate
      </h2>

      <SlateEditor />

    </div>
  )
}