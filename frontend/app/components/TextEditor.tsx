"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
	getContent: () => string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<Quill | null>(null);

	useEffect(() => {
		if (editorRef.current) {
			quillRef.current = new Quill(editorRef.current, {
				theme: "snow",
				modules: {
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						["bold", "italic", "underline", "strike"],
						[{ list: "ordered" }, { list: "bullet" }],
						["link", "image"],
						["clean"],
					],
				},
				placeholder: "Beskriv din vecka...",
			});
		}

		return () => {
			quillRef.current = null;
		};
	}, []);

	useImperativeHandle(ref, () => ({
		getContent: () => {
			if (quillRef.current) {
				return quillRef.current.root.innerHTML;
			}
			return "";
		},
	}));

	return <div ref={editorRef} style={{ height: "300px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
