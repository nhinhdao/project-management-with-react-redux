
<Form>
  <Form.Group inline>
    <label>Start Date</label>
    <DatePicker onChange={this.onChangeStart} selected={this.state.start_date} disabled={true} placeholderText={this.state.start_date.toString()} />
    <label></label>
    <label>End Date</label>
    <DatePicker onChange={this.onChangeEnd} selected={this.state.end_date} disabled={true} placeholderText={this.state.end_date.toString()} />
  </Form.Group>
</Form>
index = this.state.tasks.findIndex(task => task.user.id === 2)
this.state.tasks.slice(0, index).concat(this.state.tasks.slice(index + 1))

