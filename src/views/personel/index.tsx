import { observer } from "mobx-react";
// import { Trans } from "@lingui/react";
// import { i18n } from "@lingui/core";
import "./index.scss";
// import store from "./store";
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
// import emojiSmileFill from '@iconify/icons-bi/emoji-smile-fill';
// import emojiLaughingFill from '@iconify/icons-bi/emoji-laughing-fill';
// import emojiHeartEyes from '@iconify/icons-bi/emoji-heart-eyes';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, Textarea, Tooltip } from '@nextui-org/react';

function Personel() {
    const [text, setText] = useState('');
    const [text1, setText1] = useState('');
    // 处理表情点击事件
    const handleEmojiClick = (emoji: any) => {
        setText((prevText) => prevText + emoji);
        console.log(text, text.length);

    };

    const [selectedEmoji, setSelectedEmoji] = useState('');

    // 表情包数据
    const emojiList = [
        { name: 'smile', icon: "emojione:astonished-face" },
        { name: 'laugh', icon: "emojione:astonished-face" },
        { name: 'love', icon: "emojione:astonished-face" },
        { name: 'smile', icon: "emojione:astonished-face" },
        { name: 'laugh', icon: "emojione:astonished-face" },
        { name: 'love', icon: "emojione:astonished-face" },
        { name: 'smile', icon: "emojione:astonished-face" },
        { name: 'laugh', icon: "emojione:astonished-face" },
        { name: 'love', icon: "emojione:astonished-face" },
        { name: 'smile', icon: "emojione:astonished-face" },
        { name: 'laugh', icon: "emojione:astonished-face" },
        { name: 'love', icon: "emojione:astonished-face" },
        { name: 'smile', icon: "emojione:astonished-face" },
        { name: 'laugh', icon: "emojione:astonished-face" },
        { name: 'love', icon: "emojione:astonished-face" },
        // 你可以在这里添加更多表情包
    ];

    const emojiList11 = [
        { name: 'smile', icon: '😊' },
        { name: 'laugh', icon: '😂' },
        { name: 'love', icon: '😍' },
        { name: 'thinking', icon: '🤔' },
        { name: 'cool', icon: '😎' },
        { name: 'cry', icon: '😢' },
        { name: 'playful', icon: '😜' },
        { name: 'shock', icon: '🤯' },
        { name: 'party', icon: '🥳' },
        { name: 'angel', icon: '😇' },
        { name: 'devil', icon: '😈' },
        { name: 'skull', icon: '💀' },
        { name: 'ghost', icon: '👻' },
        { name: 'clown', icon: '🤡' },
        { name: 'dog', icon: '🐶' },
        { name: 'cat', icon: '🐱' }
    ];

    const contentEditableRef = useRef(null);

    // 添加话题到文本域
    const handleAddTopic = () => {
        const topic = '#话题 '; // 固定的话题内容
        const contentEditableElement = contentEditableRef.current;

        // 获取光标位置
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // 在光标位置插入话题
        const topicElement = document.createElement('span');
        topicElement.className = 'text-blue-600 font-bold'; // 设置样式
        topicElement.innerText = topic;

        // 插入话题
        range.deleteContents();
        range.insertNode(topicElement);
        range.collapse(false); // 将光标放到插入节点后
    };



    // 处理表情点击事件
    const handleEmojiClick1 = (emoji: any) => {
        setSelectedEmoji(emoji);
    };

    return (
        <>
            个人中心
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Emoji Picker</h1>

                {/* 表情图标区域 */}
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => handleEmojiClick('😊')}
                        className="text-3xl">
                        {/* <Icon icon={emojiSmileFill} /> */}
                        <Icon icon="emojione:astonished-face" />
                    </button>
                    <button
                        onClick={() => handleEmojiClick('😂')}
                        className="text-3xl">
                        {/* <Icon icon={emojiLaughingFill} /> */}
                        <Icon icon="emojione:astonished-face" />
                    </button>
                    <button
                        onClick={() => handleEmojiClick('😍')}
                        className="text-3xl">
                        {/* <Icon icon={emojiHeartEyes} /> */}
                        <Icon icon="emojione:astonished-face" />
                    </button>
                </div>

                {/* 文本域 */}
                <textarea
                    className="border rounded w-full p-2 h-32"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something..."
                />
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Custom Textarea with NextUI and Tailwind CSS</h1>

                {/* 使用 NextUI 的 Textarea */}
                <Textarea
                    label="Your message"
                    placeholder="Type your message here..."
                    value={text}
                    onChange={(e) => setText1(e.target.value)}
                    className="custom-textarea w-full" // 使用自定义 Tailwind 样式
                    minRows={5}
                />

                {/* 显示的文本 */}
                <p className="mt-4">
                    <strong>Current Text:</strong> {text1}
                </p>
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Custom Emoji Picker with Popover</h1>

                {/* 下拉菜单实现 */}
                <Popover className="w-80">
                    <PopoverTrigger>
                        <Button>Select Emoji</Button>
                    </PopoverTrigger>

                    {/* 确保 PopoverContent 不使用 flex 布局，设置为 block */}
                    <PopoverContent className="block w-80 p-4">
                        {/* 表情网格布局，确保 grid-cols-3 正确生效 */}
                        <div className="w-80 grid grid-cols-3 gap-4" style={{ width: "300px" }}>
                            {emojiList.map((emoji) => (
                                <Tooltip
                                    key={emoji.name}
                                    content={emoji.name}
                                    color="default"
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded shadow-md text-sm"
                                >
                                    <button
                                        onClick={() => handleEmojiClick1(emoji.icon)}
                                        className="text-3xl flex justify-center items-center w-full h-12"
                                    >
                                        <Icon icon={emoji.icon} />
                                    </button>
                                </Tooltip>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                {/* 显示选择的表情 */}
                {selectedEmoji && (
                    <div className="mt-4 text-3xl">
                        <span>Selected Emoji: </span>
                        <Icon icon={selectedEmoji} />
                    </div>
                )}
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">话题输入</h1>

                {/* 可编辑文本区域 */}
                <div
                    ref={contentEditableRef}
                    className="border p-4 mb-4 min-h-[100px] rounded"
                    contentEditable
                    suppressContentEditableWarning={true}
                />

                {/* 添加话题按钮 */}
                <Button onClick={handleAddTopic} auto>
                    添加话题
                </Button>
            </div>
        </>
    )
}

export default observer(Personel);