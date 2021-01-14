import React from 'react'
import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native'
import Peripheral, { Characteristic, Service } from 'react-native-peripheral'

export default class App extends React.Component<{}> {
  state = {
    value: '',
  }

  onOpen() {
    Peripheral.onStateChanged(state => {
      if (state === 'poweredOn') {
        const serviceUuid = 'ebed0e09-033a-4bfe-8dcc-20a04fad944e'
        Peripheral.addService(
          new Service({
            // these are just randomly generated UUIDs
            uuid: serviceUuid,
            characteristics: [
              new Characteristic({
                uuid: 'c36e1c5a-fc6e-48c8-9a8e-d0b350399d0e',
                value: 'eDox',
                properties: ['read', 'write'],
                permissions: ['readable', 'writeable'],
              }),
              new Characteristic({
                uuid: 'fbc47809-76ce-44fa-a2f0-676b95615472',
                properties: ['read', 'write'],
                permissions: ['readable', 'writeable'],
                value: 'eToz',
                onReadRequest: async () => this.state.value,
                onWriteRequest: async value => this.setState({ value }),
              }),
              new Characteristic({
                uuid: '72fac38b-cdf9-432a-ba50-c43c8d01ee52',
                properties: ['read', 'write'],
                permissions: ['readable', 'writeable'],
                value: 'ejo5',
                onReadRequest: async () => this.state.value,
                onWriteRequest: async value => this.setState({ value }),
              }),
              new Characteristic({
                uuid: '3422b87f-b971-4b97-9f98-497af6d7bdfc',
                properties: ['read', 'write'],
                permissions: ['readable', 'writeable'],
                value: 'c2VyaWFsbnVtYmVyOjEyMzQ1Njc4OQ==',
                onReadRequest: async () => this.state.value,
                onWriteRequest: async value => this.setState({ value }),
              }),
            ],
          })
        ).then(() => {
          Peripheral.startAdvertising({
            name: 'BLE Ceee Device',
            serviceUuids: [serviceUuid],
          })
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <TouchableOpacity onPress={() => this.onOpen()}>
            <Text>Open</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}