import React from 'react';
import PropTypes from 'prop-types';
import Actions from 'actions';
import FormGroup from './form-group';
import HostInput from './host-input';
import PortInput from './port-input';
import SRVInput from './srv-input';
import Authentication from './authentication';
import ReplicaSetInput from './replica-set-input';
import ReadPreferenceSelect from './read-preference-select';
import SSLMethod from './ssl-method';
import SSHTunnel from './ssh-tunnel';
import FormActions from './form-actions';
import classnames from 'classnames';

import styles from '../connect.less';

class ConnectionForm extends React.Component {
  static displayName = 'ConnectionForm';

  static propTypes = { currentConnection: PropTypes.object.isRequired };

  /**
   * Resests URL validation if form was changed.
   */
  onConnectionFormChanged() {
    Actions.onConnectionFormChanged();
  }

  /**
   * Render a port connections.
   *
   * @returns {React.Component}
   */
  renderPort() {
    if (!this.props.currentConnection.isSrvRecord) {
      return (
        <PortInput
          lastUsed={this.props.currentConnection.lastUsed}
          port={this.props.currentConnection.port} />
      );
    }
  }

  render() {
    return (
      <form
        onChange={this.onConnectionFormChanged.bind(this)}
        className={classnames(styles['connect-form'])} >
        <FormGroup separator>
          <HostInput
            lastUsed={this.props.currentConnection.lastUsed}
            hostname={this.props.currentConnection.attributes.hostname} />
          {this.renderPort()}
          <SRVInput isSrvRecord={this.props.currentConnection.isSrvRecord} />
        </FormGroup>
        <Authentication {...this.props} />
        <FormGroup id="read-preference" separator>
          <ReplicaSetInput
            sshTunnel={this.props.currentConnection.sshTunnel}
            replicaSet={this.props.currentConnection.replicaSet} />
          <ReadPreferenceSelect
            readPreference={this.props.currentConnection.readPreference} />
        </FormGroup>
        <SSLMethod {...this.props} />
        <SSHTunnel {...this.props} />
        <FormActions {...this.props } />
      </form>
    );
  }
}

export default ConnectionForm;