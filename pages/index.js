import React from 'react'
import Head from 'next/head'
import { Grid, TextArea } from 'semantic-ui-react'

const formatDateMS = timestamp => new Date(parseInt(timestamp, 10)).toISOString();

const decodeTimestamps = text => {
  return text.toString().replace(
    /([^0-9a-z])([0-9]{13})([^0-9a-z])/g,
    (match, p0, p1, p2) => `${p0}${p1} ${formatDateMS(p1)}${p2}`);
};

export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <div className='IndexPage'>
        <Head>
          <title>Timestamp decoder</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
        </Head>


        <Grid padded stackable>
          <Grid.Row columns={2}>

            <Grid.Column>
              <TextArea
                placeholder='Paste your text with timestamps here'
                rows={15}
                autoHeight
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  fontSize: 10,
                }}
                value={this.state.value}
                onChange={(event, data) => {
                  this.setState({ value: data.value });
                }}
              />
            </Grid.Column>

            <Grid.Column>
              <pre
                style={{
                  fontFamily: 'monospace',
                  fontSize: 10,
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.4',
                }}
              >{decodeTimestamps(this.state.value)}</pre>
            </Grid.Column>

          </Grid.Row>
        </Grid>

      </div>
    );
  }

}
