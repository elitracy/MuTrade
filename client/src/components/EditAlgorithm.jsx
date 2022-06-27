import "../css/tailwind.css";
import React from "react";

export default class EditAlgorithm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingValue: "",
      modifiedSetting: "",
    };
    console.log(this.props.changeAlgorithm);
  }

  setSettingValue(value) {
    this.setState({ settingValue: value });
  }

  setModifiedSetting(setting) {
    this.setState({ modifiedSetting: setting });
  }

  render() {
    return (
      <div
        className="edit-algorithm"
        class="w-11/12 h-3/4 flex flex-col justify-evenly bg-blue-800 mx-auto mt-24 rounded-3xl"
      >
        <h1 class="text-white text-5xl w-full py-3 pb-6  mx-auto text-center border-b-4 border-white tracking-wider">
          {this.props.name} Settings
        </h1>
        <div
          className="settings"
          class="w-full h-4/5 flex flex-wrap justify-center overflow-scroll"
        >
          {this.props.settings.map((setting) => {
            let isModified = false;
            return (
              <div
                className="settings"
                class="w-full m-2 mx-4 bg-white rounded-xl p-3 flex justify-between"
              >
                <h1 class="text-blue-800 text-2xl mx-auto text-right rounded-xl w-3/5 h-auto my-auto">
                  {setting.name}
                </h1>
                <div
                  className="setting-input"
                  class="flex w-1/5 justify-center mx-auto"
                >
                  <input
                    type="number"
                    name=""
                    value={
                      this.state.settingValue === ""
                        ? setting.value
                        : isModified
                        ? this.state.settingValue
                        : setting.value
                    }
                    onInput={(e) => {
                      isModified = true;
                      this.setSettingValue(e.target.value);
                      this.setModifiedSetting(setting.name);
                      this.props.changeAlgorithm(
                        this.props.name,
                        setting.name,
                        e.target.value
                      );
                    }}
                    id=""
                    step="1"
                    class="text-white text-2xl w-3/5 h-3/5 my-auto text-center bg-blue-800 rounded-md px-3 py-2"
                  />
                </div>
                <h1 class="text-blue-800 text-xl text-left w-1/5 h-auto my-auto ">
                  {setting.unit}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
